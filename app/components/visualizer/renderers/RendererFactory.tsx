'use client';

import { AlgorithmStep } from '@/src/core/engine/types';
import { getRendererType } from './getRendererType';
import ArrayRenderer from './ArrayRenderer';
import StackRenderer from './StackRenderer';
import QueueRenderer from './QueueRenderer';
import TreeRenderer from './TreeRenderer';
import GraphRenderer from './GraphRenderer';
import GenericRenderer from './GenericRenderer';

interface Props {
  step: AlgorithmStep;
}

export default function RendererFactory({ step }: Props) {
  const type = getRendererType(step);

  switch (type) {
    case 'array':
      return <ArrayRenderer step={step} />;
    case 'stack':
      return <StackRenderer step={step} />;
    case 'queue':
      return <QueueRenderer step={step} />;
    case 'tree':
      return <TreeRenderer step={step} />;
    case 'graph':
      return <GraphRenderer step={step} />;
    default:
      return <GenericRenderer step={step} />;
  }
}
