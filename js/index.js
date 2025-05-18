/**
 *
 * @source: http://www.lduros.net/some-javascript-source.js
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2014  Loic J. Duros
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

document.addEventListener("DOMContentLoaded", () => {
  const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";
  const SCRAMBLE_SPEED = 50;
  const REVEAL_DELAY = 100;
  const SYSTEM_LOG_INTERVAL = 7000;
  const MAX_LOG_MESSAGES = 5;

  function scrambleText(element) {
    const originalText = element.dataset.scrambleText || element.innerText;
    element.dataset.originalText = originalText; // Store for potential re-scramble
    let currentText = "";
    let revealIndex = 0;

    function updateScramble() {
      let scrambledPart = "";
      if (revealIndex < originalText.length) {
        for (let i = revealIndex; i < originalText.length; i++) {
          scrambledPart +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        element.innerText = currentText + scrambledPart;
        setTimeout(updateScramble, SCRAMBLE_SPEED);
      } else {
        element.innerText = originalText;
      }
    }

    function revealNextChar() {
      if (revealIndex < originalText.length) {
        currentText += originalText[revealIndex];
        revealIndex++;
        if (revealIndex < originalText.length) {
          // Don't start scramble if only 1 char left
          setTimeout(revealNextChar, REVEAL_DELAY);
        } else {
          updateScramble();
        }
      }
    }

    revealNextChar();
    updateScramble();
  }

  document.querySelectorAll("[data-scramble-text]").forEach((el) => {
    scrambleText(el);
  });

  const perspectiveWrapper = document.querySelector(".perspective-wrapper");
  const container = document.querySelector(".container");
  if (perspectiveWrapper && container) {
    perspectiveWrapper.addEventListener("mousemove", (e) => {
      const rect = perspectiveWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const maxTilt = 3;
      const tiltX = ((y - midY) / midY) * -maxTilt;
      const tiltY = ((x - midX) / midX) * maxTilt;
      requestAnimationFrame(() => {
        container.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(5px)`;
      });
    });
    perspectiveWrapper.addEventListener("mouseleave", () => {
      requestAnimationFrame(() => {
        container.style.transform =
          "rotateX(0deg) rotateY(0deg) translateZ(0px)";
      });
    });
  }

  const systemLogElement = document.getElementById("system-log");
  const systemMessages = [
    "Signal integrity fluctuating...",
    "Memory defragmentation required.",
    "Node 0xNAVI: Connection stable.",
    "Querying Collective Unconscious...",
    "Protocol LAIN handshake initiated.",
    "WARNING: Unidentified data packet received.",
    "System clock desynchronized. Recalibrating...",
    "Reality layer coherence: 97.3%",
    "Listening for phantom signals...",
    "The Wired is vast and silent.",
    "Error Code 0x0000DEADBEEF: Non-critical.",
    "Compiling emotional matrix...",
    "0xOS: Idle.",
  ];
  if (systemLogElement) {
    setInterval(() => {
      const newMessage =
        systemMessages[Math.floor(Math.random() * systemMessages.length)];
      const listItem = document.createElement("li");
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      listItem.innerHTML = `<span>[${timestamp}]</span> ${newMessage}`;
      systemLogElement.insertBefore(listItem, systemLogElement.firstChild);
      if (systemLogElement.children.length > MAX_LOG_MESSAGES) {
        systemLogElement.removeChild(systemLogElement.lastChild);
      }
      setTimeout(() => (listItem.style.opacity = 1), 10);
    }, SYSTEM_LOG_INTERVAL);
  }

  const signalIntegrityElement = document.getElementById("signalIntegrity");
  if (signalIntegrityElement) {
    setInterval(() => {
      const integrityStates = [
        "[STABLE]",
        "[FLUCTUATING]",
        "[DEGRADED_MINOR]",
        "[OPTIMAL]",
        "[AWAITING_PACKET]",
      ];
      signalIntegrityElement.textContent =
        integrityStates[Math.floor(Math.random() * integrityStates.length)];
    }, 5000);
  }

  const cube = document.getElementById("interactiveCube");
  let cubeBaseHue = 180;
  function animateCube() {
    const time = Date.now() * 0.0002;
    const pulseOpacity = 0.5 + Math.sin(time * 3) * 0.2;
    cubeBaseHue = (cubeBaseHue + 0.1) % 360;
    const currentHue = cubeBaseHue + Math.sin(time * 0.5) * 15;
    if (cube) {
      cube.querySelectorAll(".face").forEach((face) => {
        face.style.backgroundColor = `hsla(${currentHue}, 70%, 50%, ${pulseOpacity * 0.2})`;
        face.style.borderColor = `hsla(${currentHue}, 80%, 60%, ${pulseOpacity})`;
        face.style.boxShadow = `0 0 10px hsla(${currentHue}, 80%, 60%, ${pulseOpacity * 0.7}), inset 0 0 5px hsla(${currentHue}, 80%, 60%, ${pulseOpacity * 0.3})`;
      });
    }
    requestAnimationFrame(animateCube);
  }
  if (cube) {
    animateCube();
  }

  const terminalInput = document.getElementById("terminalInput");
  const terminalOutput = document.getElementById("terminalOutput");
  const promptElement = document.querySelector(".terminal-input-line .prompt");
  const commandHistory = [];
  let historyIndex = -1;

  function appendToTerminal(htmlContent, type = "") {
    const line = document.createElement("div");
    if (type) line.classList.add(type);
    line.innerHTML = htmlContent;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function echoCommand(command) {
    const promptText = promptElement.textContent;
    appendToTerminal(
      `<span class="prompt">${promptText}</span>${command}`,
      "command-echo",
    );
  }

  function processCommand(command) {
    echoCommand(command);
    const [cmd, ...args] = command.toLowerCase().trim().split(/\s+/);

    switch (cmd) {
      case "help":
        appendToTerminal("Available commands:");
        appendToTerminal("  help          - Displays this help message.");
        appendToTerminal("  whoami        - Displays user information.");
        appendToTerminal(
          "  date          - Shows the current system date/time.",
        );
        appendToTerminal("  clear         - Clears the terminal screen.");
        appendToTerminal("  connect <host> - Simulates connecting to a host.");
        appendToTerminal("  scan <target>   - Simulates scanning a target.");
        appendToTerminal("  lain          - A message from the Wired.");
        appendToTerminal(
          "  matrix        - Display a small data rain (visual).",
        );
        break;
      case "whoami":
        appendToTerminal("User: 0xnavi");
        appendToTerminal("UID: 1337 (ethereal_user)");
        appendToTerminal("Shell: /bin/0xsh");
        appendToTerminal("Connection: Layer 7 Interlink");
        break;
      case "date":
        appendToTerminal(new Date().toString());
        break;
      case "clear":
        terminalOutput.innerHTML = "";
        break;
      case "connect":
        if (args.length > 0) {
          appendToTerminal(`Simulating connection to ${args.join(" ")}...`);
          setTimeout(
            () => {
              if (
                args[0].includes("protocol.lain") ||
                args[0].includes("iwakura")
              ) {
                appendToTerminal(
                  `Connection to ${args.join(" ")} ESTABLISHED. Signal unstable.`,
                  "success",
                );
                appendToTerminal(`> You are not alone.`, "info");
              } else if (Math.random() > 0.3) {
                appendToTerminal(
                  `Connection to ${args.join(" ")} ESTABLISHED.`,
                  "success",
                );
              } else {
                appendToTerminal(
                  `Connection to ${args.join(" ")} FAILED. Host unreachable.`,
                  "error",
                );
              }
            },
            1000 + Math.random() * 1000,
          );
        } else {
          appendToTerminal("Usage: connect <hostname>", "error");
        }
        break;
      case "scan":
        if (args.length > 0) {
          appendToTerminal(
            `Initiating aggressive scan on ${args.join(" ")}...`,
          );
          let progress = 0;
          const scanInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 10;
            if (progress >= 100) {
              progress = 100;
              appendToTerminal(`Scan complete: ${progress}%`);
              appendToTerminal(
                `Target ${args.join(" ")} vulnerabilities: Moderate. Open ports: 22 (SSH), 80 (HTTP), 65535 (Ψ-Protocol).`,
                "info",
              );
              clearInterval(scanInterval);
            } else {
              appendToTerminal(`Scanning... ${progress}%`);
            }
          }, 500);
        } else {
          appendToTerminal("Usage: scan <target_ip_or_domain>", "error");
        }
        break;
      case "lain":
        appendToTerminal("-------------------------------------------------");
        appendToTerminal("No matter where you go, everyone's connected.");
        appendToTerminal("Close the world. Open the nExt.");
        appendToTerminal("Let's all love Lain.");
        appendToTerminal(
          "-------------------------------------------------",
          "info",
        );
        break;
      case "matrix":
        appendToTerminal("Initializing data stream visualization...");
        runMatrixEffect();
        break;
      case "":
        break;
      default:
        appendToTerminal(`command not found: ${cmd}`, "error");
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const command = terminalInput.value.trim();
        if (command) {
          if (commandHistory[commandHistory.length - 1] !== command) {
            commandHistory.push(command);
          }
          historyIndex = commandHistory.length;
          processCommand(command);
        } else {
          echoCommand("");
        }
        terminalInput.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex];
          terminalInput.setSelectionRange(
            terminalInput.value.length,
            terminalInput.value.length,
          );
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
          terminalInput.setSelectionRange(
            terminalInput.value.length,
            terminalInput.value.length,
          );
        } else if (historyIndex === commandHistory.length - 1) {
          historyIndex = commandHistory.length;
          terminalInput.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
      }
    });
    const terminalSection = document.getElementById("terminal");
    if (terminalSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              terminalInput.focus();
            }
          });
        },
        { threshold: 0.5 },
      );
      observer.observe(terminalSection);
    }
    if (terminalOutput) {
      terminalOutput.addEventListener("click", () => {
        terminalInput.focus();
      });
    }
  }

  function runMatrixEffect() {
    const matrixChars =
      "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789ABCDEF";
    const numLines = 10;
    let lines = [];

    function createLine() {
      let lineStr = "";
      for (let i = 0; i < Math.floor(Math.random() * 40) + 20; i++) {
        // Random length
        lineStr += matrixChars[Math.floor(Math.random() * matrixChars.length)];
      }
      return lineStr;
    }

    for (let i = 0; i < numLines; i++) {
      lines.push({
        text: createLine(),
        y: Math.floor(Math.random() * -numLines),
      });
    }

    let matrixCount = 0;
    const maxMatrixIterations = 150;

    function drawMatrix() {
      if (matrixCount >= maxMatrixIterations) {
        appendToTerminal("Data stream terminated.", "info");
        return; // Stop the effect
      }

      let outputHTML = "";
      lines.forEach((line) => {
        let displayedLine = "";
        for (let char of line.text) {
          if (Math.random() < 0.1) {
            displayedLine += `<span style="color: #fffff0; opacity: 0.9;">${char}</span>`;
          } else if (Math.random() < 0.2) {
            displayedLine += `<span style="opacity: 0.6;">${char}</span>`;
          } else {
            displayedLine += char;
          }
        }
        // Using margin-left for positioning is hacky but simple for this context
        outputHTML += `<div class="ascii-art" style="margin-left: ${Math.floor(Math.random() * 5)}ch; opacity: ${0.5 + Math.random() * 0.5}">${displayedLine.substring(0, Math.floor(line.y))}</div>`;
        line.y += Math.random() * 0.5 + 0.2;
        if (line.y > line.text.length + 5) {
          line.text = createLine();
          line.y = Math.floor(Math.random() * -5);
        }
      });

      let matrixDisplay = terminalOutput.querySelector(
        ".matrix-effect-display",
      );
      if (!matrixDisplay) {
        matrixDisplay = document.createElement("div");
        matrixDisplay.classList.add("matrix-effect-display");
        terminalOutput.appendChild(matrixDisplay);
      }
      matrixDisplay.innerHTML = outputHTML;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;

      matrixCount++;
      requestAnimationFrame(drawMatrix);
    }

    let matrixDisplay = terminalOutput.querySelector(".matrix-effect-display");
    if (matrixDisplay) {
      // Remove old display if exists
      matrixDisplay.remove();
    }
    matrixDisplay = document.createElement("div"); // Create new
    matrixDisplay.classList.add("matrix-effect-display");
    terminalOutput.appendChild(matrixDisplay);
    drawMatrix(); // Start the effect
  }
});
