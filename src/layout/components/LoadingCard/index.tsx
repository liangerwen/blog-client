import { useModel } from 'umi';
import React from 'react';

import type { IProps as CardProps } from '@/components/Card';
import Card from '@/components/Card';
import Loading from '@/components/Loading';

type IProps = {
  cardProps: CardProps;
  controlLoading?: boolean;
};

const CardLoading: React.FC<IProps> = ({
  cardProps,
  controlLoading,
  children,
}) => {
  const { loading } = useModel('@@initialState');

  return (
    <Card {...cardProps}>
      {controlLoading || (controlLoading === undefined && loading) ? (
        <Loading />
      ) : (
        children
      )}
    </Card>
  );
};

export default CardLoading;
