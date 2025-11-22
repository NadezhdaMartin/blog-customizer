import { CSSProperties, useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import styles from './styles/index.module.scss';

export function App() {
	const [appliedParams, setAppliedParams] =
		useState<typeof defaultArticleState>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--container-width': appliedParams.contentWidth.value,
					'--bg-color': appliedParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				appliedParams={appliedParams}
				onApply={setAppliedParams}
			/>
			<Article />
		</main>
	);
}
