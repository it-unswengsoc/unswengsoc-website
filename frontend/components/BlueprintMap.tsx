'use client';

import BlueprintElement from './BlueprintElement';
import AnimatedSprite from './AnimatedSprite';
import { Section } from './types';

// Sprite configuration for the eng-logo (7x7 grid = 49 frames)
const LOGO_SPRITE_CONFIG = {
  src: '/eng-logo-sprite.png',
  frameWidth: 541,
  frameHeight: 577,
  columns: 7,
  rows: 7,
  totalFrames: 49,
};

// Sprite configuration for the helmet (6x4 grid = 22 frames)
const HELMET_SPRITE_CONFIG = {
  src: '/helmet-sprite.png',
  frameWidth: 600,
  frameHeight: 600,
  columns: 6,
  rows: 4,
  totalFrames: 22,
};

// Sprite configuration for the cog (7x3 grid = 19 frames)
const COG_SPRITE_CONFIG = {
  src: '/cog-sprite.png',
  frameWidth: 600,
  frameHeight: 600,
  columns: 4,
  rows: 5,
  totalFrames: 19,
};

// Sprite config for flask
const FLASK_SPRITE_CONFIG = {
  src: '/flask-sprite.png',
  frameWidth: 448,
  frameHeight: 635,
  columns: 5,
  rows: 3,
  totalFrames: 13,
};

const BRIEF_SPRITE_CONFIG = {
  src: '/brief-sprite.png',
  frameWidth: 600,
  frameHeight: 600,
  columns: 5,
  rows: 4,
  totalFrames: 19,
};

interface BlueprintMapProps {
  onSectionClick: (section: Section) => void;
  disableEntrance?: boolean;
}

export default function BlueprintMap({ onSectionClick, disableEntrance = false }: BlueprintMapProps) {
  return (
    <div
      className="blueprint-canvas"
    >
      {/* Events - Flask Sprite */}
      <BlueprintElement
        id="events"
        label="events"
        style={{
          position: 'absolute',
          left: '10%',
          top: '20%',
          width: '120px',
          height: '160px',
        }}
        labelPosition="right"
        onClick={() => onSectionClick('events')}
        animationDelay={0}
        disableEntrance={disableEntrance}
      >
        {(isHovered) => (
          <AnimatedSprite
            src={FLASK_SPRITE_CONFIG.src}
            frameWidth={FLASK_SPRITE_CONFIG.frameWidth}
            frameHeight={FLASK_SPRITE_CONFIG.frameHeight}
            columns={FLASK_SPRITE_CONFIG.columns}
            rows={FLASK_SPRITE_CONFIG.rows}
            totalFrames={FLASK_SPRITE_CONFIG.totalFrames}
            isHovered={isHovered}
            displaySize={220}
          />
        )}
      </BlueprintElement>

      {/* Sponsors - Helmet Sprite */}
      <BlueprintElement
        id="sponsors"
        label="sponsors"
        style={{
          position: 'absolute',
          left: '15%',
          top: '50%',
          width: '300px',
          height: '300px',
        }}
        labelPosition="right"
        onClick={() => onSectionClick('sponsors')}
        animationDelay={0.2}
        disableEntrance={disableEntrance}
      >
        {(isHovered) => (
          <AnimatedSprite
            src={HELMET_SPRITE_CONFIG.src}
            frameWidth={HELMET_SPRITE_CONFIG.frameWidth}
            frameHeight={HELMET_SPRITE_CONFIG.frameHeight}
            columns={HELMET_SPRITE_CONFIG.columns}
            rows={HELMET_SPRITE_CONFIG.rows}
            totalFrames={HELMET_SPRITE_CONFIG.totalFrames}
            isHovered={isHovered}
            displaySize={200}
          />
        )}
      </BlueprintElement>

      {/* About - Animated Logo Sprite (Center) */}
      <BlueprintElement
        id="about"
        label="about us"
        style={{
          position: 'absolute',
          left: '37%',
          top: '26%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
        }}
        labelPosition="bottom"
        onClick={() => onSectionClick('about')}
        animationDelay={0.4}
        disableEntrance={disableEntrance}
      >
        {(isHovered) => (
          <AnimatedSprite
            src={LOGO_SPRITE_CONFIG.src}
            frameWidth={LOGO_SPRITE_CONFIG.frameWidth}
            frameHeight={LOGO_SPRITE_CONFIG.frameHeight}
            columns={LOGO_SPRITE_CONFIG.columns}
            rows={LOGO_SPRITE_CONFIG.rows}
            totalFrames={LOGO_SPRITE_CONFIG.totalFrames}
            isHovered={isHovered}
            displaySize={350}
          />
        )}
      </BlueprintElement>

      {/* Programs - Cog Sprite */}
      <BlueprintElement
        id="programs"
        label="programs"
        style={{
          position: 'absolute',
          right: '15%',
          top: '10%',
          width: '200px',
          height: '200px',
        }}
        labelPosition="left"
        onClick={() => onSectionClick('programs')}
        animationDelay={0.6}
        disableEntrance={disableEntrance}
      >
        {(isHovered) => (
          <AnimatedSprite
            src={COG_SPRITE_CONFIG.src}
            frameWidth={COG_SPRITE_CONFIG.frameWidth}
            frameHeight={COG_SPRITE_CONFIG.frameHeight}
            columns={COG_SPRITE_CONFIG.columns}
            rows={COG_SPRITE_CONFIG.rows}
            totalFrames={COG_SPRITE_CONFIG.totalFrames}
            isHovered={isHovered}
            displaySize={220}
          />
        )}
      </BlueprintElement>

      {/* Jobs - Briefcase SPRITE */}
      <BlueprintElement
        id="jobs"
        label="jobs board"
        style={{
          position: 'absolute',
          right: '15%',
          bottom: '15%',
          width: '130px',
          height: '100px',
        }}
        labelPosition="left"
        onClick={() => onSectionClick('jobs')}
        animationDelay={0.8}
        disableEntrance={disableEntrance}
      >
        {(isHovered) => (
          <AnimatedSprite
            src={BRIEF_SPRITE_CONFIG.src}
            frameWidth={BRIEF_SPRITE_CONFIG.frameWidth}
            frameHeight={BRIEF_SPRITE_CONFIG.frameHeight}
            columns={BRIEF_SPRITE_CONFIG.columns}
            rows={BRIEF_SPRITE_CONFIG.rows}
            totalFrames={BRIEF_SPRITE_CONFIG.totalFrames}
            isHovered={isHovered}
            displaySize={240}
          />
        )}
      </BlueprintElement>

    </div>
  );
}
