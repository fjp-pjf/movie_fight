const createAutoComplete = ({ 
    root, 
    renderOption, 
    onOptionSelect, 
    inputValue,
    fetchData
    }) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class = "dropdown">
            <div class = "dropdown-menu">
                <div class = "dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

const onInput = async event => {
        const items = await fetchData(event.target.value);

        if(!items.length){
            dropdown.classList.remove('is-active');
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for(let item of items){
            const option = document.createElement('a');
            

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);

            option.addEventListener('click', ()=>{
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });

            resultsWrapper.appendChild(option);

        }
    };
    //on first keypress "timeoutId" is going to be undefined and it will move onto the setTimeout
    //function.But it will be resolved only after a second so within that we will press the second key
    //so next time it will have a timeoutId and it will clear the interval everytime.
    //And only after a second of gap the function will be called.
    input.addEventListener('input', debounce(onInput, 1000));
    document.addEventListener('click',event =>{
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    });

}