import React from 'react';
import {ModelType} from "../../types/modelProduct.type";

interface ColorSelectorProps {
    models: ModelType [];
    selectedColor: string;
    onSelectColor: (model: ModelType) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({models, selectedColor, onSelectColor}) => {
    return (
        <div>
            <div style={{display: 'flex', gap: '10px'}}>
                {models.map((model, index) => {
                    if (!model.quantity) return;
                    const isSelected = selectedColor === model.color;
                    return (
                        <div
                            key={index}
                            className="color-wrapper"
                            onClick={() => onSelectColor(model)}
                            style={{
                                cursor: 'pointer',
                                border: isSelected ? '3px solid black' : 'none',
                                padding: isSelected ? '2px' : '3px'
                            }}
                        >
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundImage: `linear-gradient(45deg, ${model.color} 50%, ${model.color} 50%)`,
                                    borderRadius: '99px',
                                    border: '1px solid gray'
                                }}
                                title={model.color}
                                aria-label={model.color}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorSelector;
