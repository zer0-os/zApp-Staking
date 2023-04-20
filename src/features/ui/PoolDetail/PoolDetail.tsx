import { FC } from 'react';
import styles from './PoolDetail.module.scss';

import { Image } from '@zero-tech/zui/components';

export interface PoolDetailProps {
	name: string;
	imageUrl: string;
}

export const PoolDetail: FC<PoolDetailProps> = ({ name, imageUrl }) => {
	return (
		<div className={styles.PoolDetail}>
			{/* Appending location.origin as all images are local */}
			<Image
				className={styles.Thumbnail}
				alt={name + ' icon'}
				src={location.origin + imageUrl}
			/>{' '}
			{name}
		</div>
	);
};
