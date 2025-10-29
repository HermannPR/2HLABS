interface IntroCardProps {
  icon: string;
  headline: string;
  body: string;
  color: 'primary' | 'secondary' | 'accent';
}

export const IntroCard = ({ icon, headline, body, color }: IntroCardProps) => {
  const colorClasses = {
    primary: 'border-primary text-primary',
    secondary: 'border-secondary text-secondary',
    accent: 'border-accent text-accent',
  };

  return (
    <div
      className={`border-2 ${colorClasses[color]} bg-dark/50 backdrop-blur-sm rounded-xl p-8 text-center`}
    >
      <div className={`text-5xl mb-4 ${colorClasses[color]}`}>{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{headline}</h3>
      <p className="text-gray-300 leading-relaxed">{body}</p>
    </div>
  );
};
