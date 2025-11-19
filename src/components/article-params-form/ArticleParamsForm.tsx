import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		console.log('formRef.current', formRef.current);
		console.log('event.target', event.target);
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsFormOpen(false);
		}
	};

	useEffect(() => {
		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={formRef}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
