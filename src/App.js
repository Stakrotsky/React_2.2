import { useState } from 'react';
import styles from './app.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
	const [steps, setSteps] = useState(data);
	const [activeIndex, setaAtiveIndex] = useState(0);

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
	function onForwardStepButtonClick() {
		setaAtiveIndex(activeIndex + 1);
	}
	function onStepBackButtonClick() {
		setaAtiveIndex(activeIndex - 1);
	}
	function onBeginningStepButtonClick() {
		setaAtiveIndex(0);
	}
	function onStepButtonClick(index) {
		setaAtiveIndex(index);
	}

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
	const isBeginningStep = activeIndex === 0;
	const isEndingStep = activeIndex === 6;
	console.log(isEndingStep);
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map(({ id, title }, index) => (
							<li
								className={
									styles['steps-item'] +
									(index < activeIndex ? ' ' + styles.done : '') +
									(index === activeIndex ? ' ' + styles.active : '')
								}
								key={id}
							>
								<button
									className={styles['steps-item-button']}
									onClick={() => onStepButtonClick(index)}
								>
									{Number(id)}
								</button>
								{title}
							</li>
						))}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={onStepBackButtonClick}
							disabled={isBeginningStep}
						>
							Назад
						</button>
						{isEndingStep ? (
							<button
								className={styles.button}
								onClick={onBeginningStepButtonClick}
							>
								Начать с начала
							</button>
						) : (
							<button
								className={styles.button}
								onClick={onForwardStepButtonClick}
							>
								Далее
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
