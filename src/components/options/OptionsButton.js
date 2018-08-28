import React from 'react';
import { translate } from 'react-i18next';

const OptionsButton = ({ block, t, onPropChange }) => {
	const fontSize = block.options.container.fontSize.match(/\d+/)?block.options.container.fontSize.match(/\d+/)[0]: '16';
	return (
		<div>
			<div>
				<label>{t("Custom style")} <input type="checkbox" checked={block.options.container.customStyle? 'checked': '' } onChange={(e) => onPropChange('customStyle', !block.options.container.customStyle, true)} /></label>
			</div>
			<div>
				<label>{t("Text")} <input type="text" value={block.options.elements[0].text} onChange={(e) => onPropChange('text', e.target.value, false, 0)} /></label>
			</div>
			<div>
				<label>{t("URL")} <input type="text" value={block.options.elements[0].link} onChange={(e) => onPropChange('link', e.target.value, false, 0)} /></label>
			</div>
			<hr />
			<div>
				<label>{t("Paddings")} <input type="text" value={block.options.elements[0].buttonPaddings} onChange={(e) => onPropChange('buttonPaddings', e.target.value, false, 0)} /></label>
			</div>
			<div>
				<label>{t("Height")} <input type="number" value={block.options.container.height} onChange={(e) => onPropChange('height', e.target.value, true)} /></label>
			</div>
			<div>
				<label>{t("Font size")} <input type="number" value={fontSize} onChange={(e) => onPropChange('fontSize', `${e.target.value}px`, true)} /></label>
			</div>
			<hr />
			<div>
				<label>{t("Color")} <input type="color" value={block.options.container.color} onChange={(e) => onPropChange('color', e.target.value, true)} /></label>
			</div>
			<div>
				<label>{t("Background")} <input type="color" value={block.options.container.backgroundColor} onChange={(e) => onPropChange('backgroundColor', e.target.value, true)} /></label>
			</div>
			<div>
				<label>{t("Button background")} <input type="color" value={block.options.elements[0].buttonBackgroundColor} onChange={(e) => onPropChange('buttonBackgroundColor', e.target.value, false, 0)} /></label>
			</div>
			<hr />
			<div>
				<label>{t("Button border radius")} <input type="text" value={block.options.elements[0].buttonBorderRadius} onChange={(e) => onPropChange('buttonBorderRadius', e.target.value, false, 0)} /></label>
			</div>
			<div>
				<label>
					{t("Align")}
					<input type="range" min="0" max="2" step="1" onChange={(e) => {
						let align = '';
						switch (+e.target.value) {
							case 0:
								align = 'left';
								break;
							case 1:
								align = 'center';
								break;
							case 2:
								align = 'right';
								break;
							default:
								align = 'left';
								break;
						}
						onPropChange('textAlign', align, false, 0);
					}} />
				</label>
			</div>
		</div>
	);
};

export default translate('translations')(OptionsButton);
