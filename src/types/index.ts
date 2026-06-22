import React from 'react';

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Chapter {
  thumb: string;
  title: string;
  bullets: string[];
}

export interface SceneObject {
  id: string;
  className: string;
  delay: number;
  drift: number;
  stackCenter: number;
  spawnOffset: number;
  content: React.ReactNode;
}
