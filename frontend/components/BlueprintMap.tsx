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
    <div className="blueprint-canvas absolute inset-0">
      {/* Events - Flask Sprite */}
      <BlueprintElement
        id="events"
        label="events"
        description="Discover our networking events, workshops, and social activities"
        style={{
          position: 'absolute',
          left: '18%',
          top: '12%',
          width: 'clamp(80px, 15vw, 120px)',
          height: 'clamp(100px, 20vw, 160px)',
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
        description="Meet our industry partners and sponsorship opportunities"
        style={{
          position: 'absolute',
          left: '15%',
          top: '62%',
          width: 'clamp(120px, 20vw, 300px)',
          height: 'clamp(120px, 20vw, 300px)',
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
      <div style={{
        position: 'absolute',
        left: 'calc(50% + 15px)',
        top: 'calc(50% + 15px)',
        transform: 'translate(-50%, -50%)',
      }}>
        <BlueprintElement
          id="about"
          label="about us"
          description="Learn about our mission, team, and what we do for engineers"
          style={{
            position: 'relative',
            width: 'clamp(200px, 30vw, 400px)',
            height: 'clamp(200px, 30vw, 400px)',
          }}
          labelPosition="right"
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
      </div>

      {/* Programs - Cog Sprite */}
      <BlueprintElement
        id="programs"
        label="programs"
        description="Explore mentorship, career development, and student programs"
        style={{
          position: 'absolute',
          right: '18%',
          top: '15%',
          width: 'clamp(100px, 15vw, 200px)',
          height: 'clamp(100px, 15vw, 200px)',
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
        description="Browse internships, graduate roles, and career opportunities"
        style={{
          position: 'absolute',
          right: '18%',
          bottom: '18%',
          width: 'clamp(100px, 12vw, 130px)',
          height: 'clamp(80px, 10vw, 100px)',
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
