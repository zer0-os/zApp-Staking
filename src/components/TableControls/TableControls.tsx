import React from 'react';

import styles from './TableControls.module.scss';

import { Controls, View, ViewToggle } from '@zero-tech/zui/components';

interface TableControlsProps {
	view: View;
	onChangeView: (view: View) => void;
}

export const TableControls = ({
	view,
	onChangeView,
}: TableControlsProps): JSX.Element => {
	return (
		<Controls>
			<ViewToggle
				className={styles.Toggle}
				view={view}
				onChange={onChangeView}
			/>
		</Controls>
	);
};
