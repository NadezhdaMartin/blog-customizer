import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

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
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={selectedFont}
						onChange={setSelectedFont}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						name='fontSize'
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={selectedFontColor}
						onChange={setSelectedFontColor}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={selectedBackgroundColor}
						onChange={setSelectedBackgroundColor}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={selectedContentWidth}
						onChange={setSelectedContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
