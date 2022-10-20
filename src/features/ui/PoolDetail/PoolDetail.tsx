import { FC } from 'react';
import styles from './PoolDetail.module.scss';

import { Image } from '@zero-tech/zui/components';

export interface PoolDetailProps {
	name: string;
	imageUrl: string;
}

export const PoolDetail: FC<PoolDetailProps> = ({ name, imageUrl }) => {
	return (
		<div className={styles.Container}>
			<Image className={styles.Thumbnail} alt={name + ' icon'} src={imageUrl} />{' '}
			{name}
		</div>
	);
};
