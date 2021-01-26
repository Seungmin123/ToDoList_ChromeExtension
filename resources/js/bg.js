/**
 * 
 */
(()=>{
	

	const UNSPLASH_URL = "https://api.unsplash.com/photos/random/?";
	const UNSPLASH_API_KEY = "Oxlav-adZeB6DINRXjBI5XCsSx7iJvcqVoJHpYoxuq4";
	
	const body = document.querySelector('body');
	const locationContainer = document.querySelector('.location-text');
	
	let getBackground = () =>{
		
		let url = `${UNSPLASH_URL}client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;
		
		fetch(url)
		.then(response => response.json())
		.then(json => {
			
			let imageUrl = json.urls.full;
			let desc = json.alt_description;
			
			if(desc){
				saveBackground(imageUrl, desc);	
				paintBackground(imageUrl,desc);
			}else{
				getBackground();
			}
			
		})
	}
	
	let saveBackground = (imageUrl, desc)=>{
		//이미지 만기일자
		let maxDate = new Date();
		maxDate.setDate(maxDate.getDate()+1);
		
		const imageObject = {
			url : imageUrl,
			maxDate : maxDate,
			desc : desc
		};
		
		localStorage.setItem("bg", JSON.stringify(imageObject));
	}
	
	let paintBackground = (url, desc) =>{
		body.style.backgroundImage = `url(${url})`;
		locationContainer.innerHTML = desc;
	}
	
	let loadBackground = (parsedImg) =>{
		
			let today = new Date();
		
			//만기일자가 지났다면	
			if(today > parsedImg.maxDate){
				getBackground();
			}else{
				paintBackground(parsedImg.url, parsedImg.desc);
			}
	}
	
	//만약 최근 api통신트로부터 하루가 지난 상황이라면 새롭게 통신을 해서
	//새 이미지를 불러오고
	//그렇지 않다면 localStorage에 저장한 이미지로 배경이미지를 사용한다.
	let init = () =>{
		
		let parsedImg = JSON.parse(localStorage.getItem("bg"));
		
		if(parsedImg){
			loadBackground(parsedImg);
			
		}else{
			//첫 api 호출
			getBackground();
		}
	}
	
	init();

})();