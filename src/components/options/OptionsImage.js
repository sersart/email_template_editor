import React from 'react';
import { translate } from 'react-i18next';

const OptionsImage = ({ block, t, onFileChange, onPropChange }) => {
	return (
		<div>
			<div>
				<label>{t("Custom style")} <input type="checkbox" checked={block.options.container.customStyle? 'checked': '' } onChange={(e) => onPropChange('customStyle', !block.options.container.customStyle, true)} /></label>
			</div>
			<hr />
			<div>
				<label>
					{t("URL")}
					<label>
						<input
							type="file"
							onChange={(e) => {
								onFileChange(block, 0, e.target.files[0]);
							}} />
						<div>&#8853;</div>
					</label>
					<input type="text" value={block.options.elements[0].source} onChange={(e) => onPropChange('source', e.target.value, false, 0)} />
				</label>
			</div>
			<div>
				<label>{t("Link")} <input type="text" value={block.options.elements[0].link} onChange={(e) => onPropChange('link', e.target.value, false, 0)} /></label>
			</div>
			<div>
				<label>
					{t("Add paddings")}
					<input
					type="checkbox"
					checked={block.options.container.padding === '0'? '': 'checked'}
					onChange={(e) => {
						onPropChange('padding', (block.options.container.padding === '0'? '10px': '0'), true);
						onPropChange('width', (block.options.container.padding === '0'? '550': '570'), false, 0);
						}
					} /></label>
			</div>
			<div>
				<label>{t("Background")} <input type="color" value={block.options.container.backgroundColor} onChange={(e) => onPropChange('backgroundColor', e.target.value, true)} /></label>
			</div>
		</div>
	);
};

export default translate('translations')(OptionsImage);
