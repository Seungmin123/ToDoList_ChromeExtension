(()=>{
	
/*
 	1. 사용자가 이전에 저장한 todolist가 localStorage 이미 있을 경우
	2. 사용자가 todoList를 작성했을 때 localStorage 저장한 후 작성한 todolist를 화면에 출력
		todoList는 객체배열 형태로 저장
	3. 사용자가 지우개 아이콘을 클릭하면 해당 todolist를 삭제하고, localStorage 에서도 삭제
*/
let todoArr = [];
let todoContainer = document.querySelector('.frm_to-do');
let list = document.querySelector('.list');

/*let getTodo = () =>{
	let todos = localStorage.getItem('todos');
	todoArr = JSON.parse(todos);
	return todoArr;
}*/

let persistTodo = (todo) =>{
		let todoObj = {};
		let todos = localStorage.getItem('todos');

		
	

		if(todos){
			todoArr = JSON.parse(todos);

			if(todoArr.length >4){
				alert("올 해 반드시 해야하는 5가지 일만 등록해주세욥");
				return;
			}
			//고유한 인덱스를 가지는 객체를 넣어준다.
			todoObj.idx = todoArr.length;
		}else{
			todoObj.idx = 0;
		}
		
		todoObj.todoStr = todo;
		todoArr.push(todoObj);
		localStorage.setItem('todos',JSON.stringify(todoArr));
	}




let saveTodo = (event) => {
	/*let todo = document.querySelector('.to-do_add').value;
	if(todo){
		
		if(getTodo()){	
			
			//고유한 인덱스를 가지는 객체를 넣어준다.
			let todoObj = {idx:todoArr.length,todoStr:todo};
			todoArr.push(todoObj);
		}else{
			let todoObj = {idx:0,todoStr:todo};
			todoArr.push(todoObj);
		}
		
		
		localStorage.setItem('todos', JSON.stringify(todoArr));
		
	}else{
		alert("할 일을 입력 해주세요.");
	}*/
	
	
	//event의 기본 동작을 취소시키는 메소드
	//submit 이벤트의 기본 동작을 취소 시켜서 새로고침을 막아준다.
	event.preventDefault();
		
	let todo = document.querySelector('.to-do_add').value;
		if(todo){
			persistTodo(todo);			
			localStorage.setItem('todos', JSON.stringify(todoArr));
		}else{
			alert("할 일을 입력 해주세요.");
		}
		
		paintTodo();
		
		//포커스 지정
		document.querySelector('.to-do_add').focus();
}

let paintTodo = () => {
	
	list.innerHTML = "";
	
	todoArr.forEach((e)=>{
		
		let li = document.createElement('li');
		li.className = 'to-do';
		
		let deleteBtn = document.createElement('i');
		deleteBtn.className = "fas fa-trash btn_del";
		deleteBtn.style.margin = '0 1vw';
		
		deleteBtn.addEventListener('click', ()=>{
			li.outerHTML = "";
			
			//indexOf로 요소의 인덱스를 가져와서
			let idx = todoArr.indexOf(e);
			//splice로 삭제
			todoArr.splice(idx,1);
			localStorage.setItem('todos',JSON.stringify(todoArr));
		})
		
		let todoText = document.createElement('span');
		todoText.innerHTML = e.todoStr;
		
		li.append(deleteBtn);
		li.append(todoText);
		
		list.appendChild(li);
		
		
	})
	
}


let init = () =>{
	let todos = localStorage.getItem('todos');
	if(todos){
		//todo-list를 화면에 출력
		todoArr = JSON.parse(todos);
		paintTodo();
	}
	
}

todoContainer.addEventListener('submit', saveTodo);
init();

	
})();







