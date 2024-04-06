

const handleAPIRequests = ({
	request,
	onSuccess = () => null,
	onError = () => null,
	...props
}) => {
	request({ ...props })
		.unwrap()
		.then((res) => {
			if (res) {
				onSuccess(res);
			}
		})
		.catch((err) => {
			onError(err);
		});
};


export default handleAPIRequests;
