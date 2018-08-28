import React from 'react';
import { translate } from 'react-i18next';

const OptionsFeedback = ({ block, t, onPropChange }) => {
	return (
		<div>
			<div>
				<label>{t("Custom style")} <input type="checkbox" checked={block.options.container.customStyle? 'checked': '' } onChange={(e) => onPropChange('customStyle', !block.options.container.customStyle, true)} /></label>
			</div>
			<div>
				<label>{t("Background")} <input type="color" value={block.options.container.backgroundColor} onChange={(e) => onPropChange('backgroundColor', e.target.value, true)} /></label>
			</div>
			<hr />
			<div>
				<label>
					{t("Align")}
					<input
					value={(block.options.elements[0].textAlign === 'left'?0:(block.options.elements[0].textAlign === "right"?2:1))}
					type="range" min="0" max="2" step="1"
					onChange={(e) => {
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
			<div>
				<label>
					{t("Icons type")}
					<select
					value={block.options.elements[0].like_source.match(/_\w+/)[0].split('').splice(1).join('')}
					onChange={(e) => {
						const el = block.options.elements[0];
						onPropChange('like_source', el.like_source.replace(/like_\w+/, `like_${e.target.value}`), false, 0);
						onPropChange('dislike_source', el.dislike_source.replace(/dislike_\w+/, `dislike_${e.target.value}`), false, 0);
						onPropChange('neutral_source', el.neutral_source.replace(/neutral_\w+/, `neutral_${e.target.value}`), false, 0);
					}}>
						<option value="3d">3d</option>
						<option value="round">round</option>
						<option value="square">square</option>
						<option value="material">material</option>
					</select>
				 </label>
			</div>
			<hr />
			<div>
				<label>
					{t("Like")}
					<input type="checkbox" checked={block.options.elements[0].like_display === ''? 'none': ''} onChange={(e) => onPropChange('like_display', (block.options.elements[0].like_display === ''? 'none': ''), false, 0)} />
					<input type="text" value={block.options.elements[0].like_link} onChange={(e) => onPropChange('like_link', e.target.value, false, 0)} />
				</label>
			</div>
			<div>
				<label>
					{t("Dislike")}
					<input type="checkbox" checked={block.options.elements[0].dislike_display === ''? 'none': ''} onChange={(e) => onPropChange('dislike_display', (block.options.elements[0].dislike_display === ''? 'none': ''), false, 0)} />
					<input type="text" value={block.options.elements[0].dislike_link} onChange={(e) => onPropChange('dislike_link', e.target.value, false, 0)} />
				</label>
			</div>
			<div>
				<label>
					{t("Neutral")}
					<input type="checkbox" checked={block.options.elements[0].neutral_display === ''? 'none': ''} onChange={(e) => onPropChange('neutral_display', (block.options.elements[0].neutral_display === ''? 'none': ''), false, 0)} />
					<input type="text" value={block.options.elements[0].neutral_link} onChange={(e) => onPropChange('neutral_link', e.target.value, false, 0)} />
				</label>
			</div>
		</div>
	);
};

export default translate('translations')(OptionsFeedback);
