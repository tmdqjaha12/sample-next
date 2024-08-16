import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MutableRefObject, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface UseBurningPaperReturn {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  scrollMsgRef: MutableRefObject<HTMLDivElement | null>;
}

function useBurningPaper(): UseBurningPaperReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const scrollMsgEl = scrollMsgRef.current;

    if (!canvasEl || !scrollMsgEl) return;

    const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
    const params = { fireTime: 0.35, fireTimeAddition: 0 };

    let gl: WebGLRenderingContext | null = null;
    let shaderProgram: WebGLProgram | null = null;
    let uniforms: { [key: string]: WebGLUniformLocation | null } = {};

    async function loadShaderSource(url: string): Promise<string> {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Shader file load error: ${response.statusText}`);
      }
      return response.text();
    }

    function getUniforms(
      gl: WebGLRenderingContext,
      program: WebGLProgram
    ): { [key: string]: WebGLUniformLocation | null } {
      const uniforms: { [key: string]: WebGLUniformLocation | null } = {};
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const uniformInfo = gl.getActiveUniform(program, i);
        if (uniformInfo) {
          const uniformName = uniformInfo.name.replace(/\[0\]$/, "");
          uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
        }
      }
      return uniforms;
    }

    async function initShader(): Promise<WebGLRenderingContext | null> {
      try {
        const vsSource = await loadShaderSource("/shaders/vertexShader.glsl");
        const fsSource = await loadShaderSource("/shaders/fragmentShader.glsl");

        const context = canvasEl?.getContext("webgl") || canvasEl?.getContext("experimental-webgl");
        if (!context) {
          alert("WebGL is not supported by your browser.");
          return null;
        }
        gl = context as WebGLRenderingContext;

        const createShader = (gl: WebGLRenderingContext, sourceCode: string, type: number): WebGLShader | null => {
          const shader = gl.createShader(type);
          if (!shader) return null;
          gl.shaderSource(shader, sourceCode);
          gl.compileShader(shader);

          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
          }
          return shader;
        };

        const vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
        const fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);

        const createShaderProgram = (
          gl: WebGLRenderingContext,
          vertexShader: WebGLShader | null,
          fragmentShader: WebGLShader | null
        ): WebGLProgram | null => {
          const program = gl.createProgram();
          if (!program || !vertexShader || !fragmentShader) return null;

          gl.attachShader(program, vertexShader);
          gl.attachShader(program, fragmentShader);
          gl.linkProgram(program);

          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Shader program init error:", gl.getProgramInfoLog(program));
            return null;
          }
          return program;
        };

        shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
        if (shaderProgram) {
          uniforms = getUniforms(gl, shaderProgram);
        }

        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

        const vertexBuffer = gl.createBuffer();
        if (vertexBuffer) {
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

          if (shaderProgram) {
            gl.useProgram(shaderProgram);

            const positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
          }
        }

        return gl;
      } catch (error) {
        console.error("Shader init error:", error);
        return null;
      }
    }

    (async () => {
      gl = await initShader();
      if (!gl || !shaderProgram || !uniforms) return;

      const render = () => {
        if (!gl || !shaderProgram || !uniforms) return;

        const currentTime = performance.now();
        if (uniforms.u_time) {
          gl.uniform1f(uniforms.u_time, currentTime / 1000);
        }
        if (uniforms.u_progress) {
          gl.uniform1f(uniforms.u_progress, params.fireTime);
        }
        gl.uniform2f(uniforms.u_resolution!, canvasEl.width, canvasEl.height);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
      };

      const resizeCanvas = () => {
        if (!gl || !canvasEl) return;

        canvasEl.width = window.innerWidth * devicePixelRatio;
        canvasEl.height = window.innerHeight * devicePixelRatio;
        gl.viewport(0, 0, canvasEl.width, canvasEl.height);
        render();
      };

      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".page",
            start: "0% 0%",
            end: "100% 100%",
            scrub: true,
          },
        })
        .to(scrollMsgEl, { duration: 0.1, opacity: 0 }, 0)
        .to(params, { fireTime: 0.63 }, 0);

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      return () => {
        window.removeEventListener("resize", resizeCanvas);
        if (tl) tl.kill();
      };
    })();
  }, []);

  return { canvasRef, scrollMsgRef };
}

export default useBurningPaper;
