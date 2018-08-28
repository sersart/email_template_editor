import React from 'react';
import { translate } from 'react-i18next';

const OptionsHr = ({ block, t, onPropChange }) => {
	return (
		<div>
			<div>
				<label>{t("Custom style")} <input type="checkbox" checked={block.options.container.customStyle? 'checked': '' } onChange={(e) => onPropChange('customStyle', !block.options.container.customStyle, true)} /></label>
			</div>
			<hr />
			<div>
				<label>{t("Height")} <input type="number" value={block.options.container.height} onChange={(e) => onPropChange('height', e.target.value, true)} /></label>
			</div>
			<div>
				<label>{t("Background")} <input type="color" value={block.options.container.backgroundColor} onChange={(e) => onPropChange('backgroundColor', e.target.value, true)} /></label>
			</div>
		</div>
	);
};

export default translate('translations')(OptionsHr);
