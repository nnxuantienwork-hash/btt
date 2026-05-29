const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'Thành Phố Hôm Nay': { bg: '#0057B8', text: '#FFFFFF' },
  'Thành Phố': { bg: '#0057B8', text: '#FFFFFF' },
  '168 Phường-Xã': { bg: '#7C3AED', text: '#FFFFFF' },
  'Đời Sống': { bg: '#059669', text: '#FFFFFF' },
  'Góc Nhìn': { bg: '#0891B2', text: '#FFFFFF' },
  'Giải Trí': { bg: '#D97706', text: '#FFFFFF' },
  'Radio': { bg: '#1D4ED8', text: '#FFFFFF' },
  'default': { bg: '#0057B8', text: '#FFFFFF' },
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

  return (
    <span
      className={className}
      style={{
        background: color.bg,
        color: color.text,
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.3px',
        textTransform: 'uppercase',
        display: 'inline-block',
      }}
    >
      {category}
    </span>
  );
}
