import React from "react";

interface Subdivision {
  key: string;
  label: string;
}

interface PodsSubdivisionFilterProps {
  subdivisions: Subdivision[];
  selected: string;
  onSelect: (key: string) => void;
  className?: string;
}

const PodsSubdivisionFilter: React.FC<PodsSubdivisionFilterProps> = ({
  subdivisions,
  selected,
  onSelect,
  className = "",
}) => {
  return (
    <div className={`flex justify-center mb-8 ${className}`}>
      <div className="flex gap-3">
        {subdivisions.map((sub) => (
          <button
            key={sub.key}
            className={`px-5 py-2 rounded-full font-semibold border transition-colors
              ${selected === sub.key
                ? "bg-black text-white border-black"
                : "bg-transparent text-black border-black hover:bg-neutral-200"}
            `}
            style={{ minWidth: 120 }}
            onClick={() => onSelect(sub.key)}
            type="button"
          >
            {sub.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PodsSubdivisionFilter;
