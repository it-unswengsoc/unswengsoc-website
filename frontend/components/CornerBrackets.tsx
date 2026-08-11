import { motion } from 'framer-motion';

export default function CornerBrackets({ visible, color = '#4191dc' }: { visible: boolean; color?: string }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Top-left corner */}
      <span
        className="absolute"
        style={{
          width: '10px',
          height: '10px',
          top: '-4px',
          left: '-6px',
          borderTopWidth: '2px',
          borderLeftWidth: '2px',
          borderTopStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopColor: color,
          borderLeftColor: color,
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      />
      {/* Top-right corner */}
      <span
        className="absolute"
        style={{
          width: '10px',
          height: '10px',
          top: '-4px',
          right: '-6px',
          borderTopWidth: '2px',
          borderRightWidth: '2px',
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderTopColor: color,
          borderRightColor: color,
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      />
      {/* Bottom-left corner */}
      <span
        className="absolute"
        style={{
          width: '10px',
          height: '10px',
          bottom: '-4px',
          left: '-6px',
          borderBottomWidth: '2px',
          borderLeftWidth: '2px',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderBottomColor: color,
          borderLeftColor: color,
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      />
      {/* Bottom-right corner */}
      <span
        className="absolute"
        style={{
          width: '10px',
          height: '10px',
          bottom: '-4px',
          right: '-6px',
          borderBottomWidth: '2px',
          borderRightWidth: '2px',
          borderBottomStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomColor: color,
          borderRightColor: color,
          filter: `drop-shadow(0 0 4px ${color})`
        }}
      />
    </motion.div>
  );
}
