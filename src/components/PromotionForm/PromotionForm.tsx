import './PromotionForm.css';
import { Canvas } from '@react-three/fiber';
import models from '../../utils/constants/models';
import DemoPiece from '../DemoPiece';
import { useState } from 'react';

interface PromotionFromProps {
  visible: boolean;
  onClick: (selectedPiece: number) => void;
}

const PromotionForm = ({ visible, onClick }: PromotionFromProps) => {
  const [selectedPiece, setSelectedPiece] = useState(2);

  return visible ? (
    <div className='popup-form-container'>
      <h2>Promote pawn to</h2>
      <div className='promote-options'>
        {[2, 3, 4, 6].map((pieceId) => (
          <div
            id={pieceId === selectedPiece ? 'selected-promote-option' : ''}
            onClick={() => setSelectedPiece(pieceId)}
          >
            <DemoPiece
              pieceId={pieceId}
              color='white'
              scale={models[pieceId].size * 0.5}
            />
          </div>
        ))}
        <button onClick={() => onClick(selectedPiece)}>confirm</button>
      </div>
    </div>
  ) : null;
};

export default PromotionForm;
