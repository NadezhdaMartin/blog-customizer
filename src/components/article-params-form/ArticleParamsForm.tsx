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

type ArticleParamsFormProps = {
	appliedParams: typeof defaultArticleState;
	onApply: (params: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
	appliedParams,
	onApply,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const [formState, setFormState] = useState(appliedParams);

	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
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

	useEffect(() => {
		if (isFormOpen) {
			setFormState(appliedParams);
		}
	}, [isFormOpen, appliedParams]);

	const handleFontChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, fontFamilyOption: option }));

	const handleFontSizeChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, fontSizeOption: option }));

	const handleFontColorChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, fontColor: option }));

	const handleBackgroundColorChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, backgroundColor: option }));

	const handleContentWidthChange = (option: OptionType) =>
		setFormState((prev) => ({ ...prev, contentWidth: option }));

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
		setIsFormOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={formRef}>
				<form className={styles.form} onSubmit={handleApply}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						title='Шрифт'
						selected={formState.fontFamilyOption}
						onChange={handleFontChange}
					/>
					<RadioGroup
						options={fontSizeOptions}
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
					/>
					<Select
						options={fontColors}
						title='Цвет шрифта'
						selected={formState.fontColor}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						title='Цвет фона'
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						options={contentWidthArr}
						title='Ширина контента'
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
