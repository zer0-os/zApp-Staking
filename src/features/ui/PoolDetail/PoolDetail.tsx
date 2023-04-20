import { FC } from 'react';

import { Image } from '@zero-tech/zui/components';

import styles from './PoolDetail.module.scss';

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
			<span id="text" className={styles.PoolName}>
				{name}
			</span>
		</div>
	);
};
