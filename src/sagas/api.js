const method = 'POST';
const headers = {
	"Accept": "application/json",
	"Content-type": "application/json;charset=UTF-8"
};

const apiEndpoint = "";

export const getCompany = (host_name) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "host_name": host_name })
    };
    console.log("SAGA readed company request", requestOptions);

    return fetch(new Request(`//localhost:8188/api/company`, requestOptions))
		.then(res => res.json())
        .then(json => json)
};

export const getTemplate = (templateId) => {
	return fetch(new Request(templateId?`${apiEndpoint}/template/${templateId}`:`/template.json`/*, { ...noCors }*/))
		.then(res => res.json())
		.then(json => json)
};

export const getComponents = () => {
	return fetch(new Request(`/components.json`/*, { ...noCors }*/))
		.then(res => res.json())
		.then(json => json)
};

export const saveImage = (file) => {
	var formData = new FormData();
	formData.append('file', file);
	const params = {
		method,
		// ...noCors,
		body: formData,
	};
	return fetch(new Request(`${apiEndpoint}/image`, params))
		.then(res => res.json())
		.then(json => json)
};

export const saveTemplate = ({ id, html, name, template }) => {
/*
with noCors use this
	var formData = new FormData();
	formData.append('html', html);
	formData.append('name', name);
	formData.append('template', JSON.stringify(template));
*/
	const params = {
		method,
		headers,
		// ...noCors,
		body: JSON.stringify({ html, name, template }) // formData
	};
	return fetch(new Request(`${apiEndpoint}/template/${id||'null'}`, params))
		.then(res => res.json())
		.then(json => json)
};

export const sendTestEmail = ({ email, html }) => {
/*
with noCors use this
	var formData = new FormData();
	formData.append('html', html);
	formData.append('email', email);
*/
	const params = {
		method,
		headers,
		// ...noCors,
		body: JSON.stringify({ email, html }) // formData
	};
	return fetch(new Request(`${apiEndpoint}/send`, params))
		.then(res => res.json())
		.then(json => json)
};
