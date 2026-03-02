"use client";
import React from "react";
import Stack from "@/components/Stack";

const images = ["./me1.png", "./me2.png", "./me3.jpg"];

export default function StackImages() {
  return (
    <div style={{ width: 208, height: 208 }}>
      <Stack
        randomRotation={true}
        sensitivity={200}
        sendToBackOnClick={true}
        cards={images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`card-${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ))}
        autoplay={true}
        autoplayDelay={500}
        pauseOnHover={true}
      />
    </div>
  );
}
