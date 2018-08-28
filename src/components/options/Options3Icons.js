import React from 'react';
import { translate } from 'react-i18next';

const Options3Icons = ({ block, t, onFileChange, onPropChange }) => {
	let textIndex = 3;
	let imageIndex = 0;
	return (
		<div>
			<div>
				<label>{t("Custom style")}: <input type="checkbox" checked={block.options.container.customStyle? 'checked': '' } onChange={(e) => onPropChange('customStyle', !block.options.container.customStyle, true)} /></label>
			</div>
			<hr />
			<div>
				<label>{t("Color")}: <input type="color" value={block.options.container.color} onChange={(e) => onPropChange('color', e.target.value, true)} /></label>
			</div>
			<div>
				<label>{t("Background")}: <input type="color" value={block.options.container.backgroundColor} onChange={(e) => onPropChange('backgroundColor', e.target.value, true)} /></label>
			</div>
			<hr />
			<div>
				<label>
					{t("URL")}
					<select value={imageIndex} onChange={e => imageIndex = +e.target.value}>
						<option value="0">{t("URL")} 1</option>
						<option value="1">{t("URL")} 2</option>
						<option value="2">{t("URL")} 3</option>
					</select>
				</label>
			</div>
			<div>
				<label>
					{t("URL")} {imageIndex + 1}:
					<label>
						<input
							type="file"
							onChange={(e) => {
								onFileChange(block, +imageIndex, e.target.files[0]);
							}} />
						<div>&#8853;</div>
					</label>
					<input type="text" value={block.options.elements[+imageIndex].source} onChange={(e) => onPropChange('source', e.target.value, false, +imageIndex)} />
				</label>
			</div>
			<hr />
			<div>
				<label>
					{t("Text")}
					<select value={textIndex} onChange={e => textIndex = +e.target.value}>
						<option value="3">{t("Text")} 1</option>
						<option value="4">{t("Text")} 2</option>
						<option value="5">{t("Text")} 3</option>
					</select>
				</label>
			</div>
			<div>
				<label>
					{t("Text")} {textIndex - 2}
					<input type="text" value={block.options.elements[+textIndex].text} onChange={e => onPropChange('text', e.target.value, false, +textIndex)} />
				</label>
			</div>
		</div>
	);
};

export default translate('translations')(Options3Icons);
