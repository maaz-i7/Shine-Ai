"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { label: "Seek", icon: "question" },
  { label: "Shine", icon: "sphere" },
  { label: "Solve", icon: "code" },
  { label: "Succeed", icon: "check" },
];

const PAUSE_MS = 500;
const TRAVEL_MS = 500;

const STAGE_DURATIONS = [
  PAUSE_MS,
  TRAVEL_MS,
  PAUSE_MS,
  TRAVEL_MS,
  PAUSE_MS,
  TRAVEL_MS,
  null,
];

function Icon({ type, active }) {
  if (type === "question") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 4" />
        <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "sphere") {
    return (
      <span
        style={{
          display: "block",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: active ? "#fcfd35" : "#4b5563",
          boxShadow: active
            ? `
              0 0 8px #fde047,
              0 0 16px #facc15,
              0 0 28px rgba(250, 204, 21, 0.95),
              0 0 40px rgba(250, 204, 21, 0.7)
            `
            : "none",
          transition: "background 0.4s ease, box-shadow 0.4s ease",
        }}
      />
    );
  }

  if (type === "code") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="8 7 4 12 8 17" />
        <polyline points="16 7 20 12 16 17" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="5 13 10 18 19 7" />
    </svg>
  );
}

export default function ProgressJourney() {
  const [stage, setStage] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const duration = STAGE_DURATIONS[stage];

    if (duration === null) return;

    timeoutRef.current = setTimeout(() => {
      setStage((s) => s + 1);
    }, duration);

    return () => clearTimeout(timeoutRef.current);
  }, [stage]);

  const nodeActive = [stage >= 0, stage >= 2, stage >= 4, stage >= 6];
  const segmentFilled = [stage >= 1, stage >= 3, stage >= 5];

  return (
    <div
      style={{
        width: "100%",
        background: "#1a1a1a",
        padding: "18px 14px",
        marginTop: "-80px",
        display: "flex",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @keyframes pj-check-in {
          0% {
            transform: scale(0.4);
            opacity: 0;
          }
          60% {
            transform: scale(1.15);
            opacity: 1;
          }
          100% {
            transform: scale(1.1);
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: 520,
        }}
      >
        {steps.map((step, i) => {
          const active = nodeActive[i];
          const isPop =
            active &&
            (step.icon === "question" || step.icon === "code");
          const isCheckPop = active && step.icon === "check";

          return (
            <div
              key={step.label}
              style={{
                display: "flex",
                alignItems: "center",
                flex:
                  i < steps.length - 1
                    ? "1 1 auto"
                    : "0 0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${active ? "#34d399" : "#374151"
                      }`,
                    color: active ? "#34d399" : "#6b7280",
                    background: "#0a0e1a",
                    boxShadow: active
                      ? "0 0 8px rgba(52,211,153,0.45)"
                      : "none",
                    transform: isPop
                      ? "scale(1.1)"
                      : "scale(1)",
                    transition:
                      "border-color 0.4s ease, color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                    animation: isCheckPop
                      ? "pj-check-in 0.5s cubic-bezier(0.34,1.56,0.64,1)"
                      : "none",
                  }}
                >
                  <Icon type={step.icon} active={active} />
                </div>

                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: active ? "#e5e7eb" : "#6b7280",
                    transition: "color 0.4s ease",
                  }}
                >
                  {step.label}
                </span>
              </div>

              {i < steps.length - 1 && (
                <div
                  style={{
                    flex: "1 1 auto",
                    height: 2,
                    background: "#1f2430",
                    margin: "0 2px 20px",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 1,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: segmentFilled[i] ? "100%" : "0%",
                      background: "#34d399",
                      boxShadow:
                        "0 0 5px rgba(52,211,153,0.6)",
                      transition: `width ${TRAVEL_MS}ms ease`,
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}