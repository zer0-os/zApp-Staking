import { FC } from 'react';
import styles from './PoolDetail.module.scss';

export interface PoolDetailProps {
	name: string;
	imageUrl: string;
}

export const PoolDetail: FC<PoolDetailProps> = ({ name, imageUrl }) => (
	<div className={styles.Container}>
		<img alt={name + ' icon'} src={imageUrl} /> {name}
	</div>
);

export default PoolDetail;
