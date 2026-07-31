const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border-2 border-pastel-purple/20 p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;