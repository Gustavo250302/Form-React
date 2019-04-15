class Button extends React.Component{
    constructor(props){
        super(props);

        this.style = this.props.style === undefined ? {} : this.props.style;
        this.id = this.props.id === undefined ? '' : this.props.id;
        this.class = this.props.class === undefined ? '' : this.props.class;
        this.type = this.props.type === undefined ? 'submit' : this.props.type;
        if (this.type === "button")
            this.type = "submit";

        /*FORM ID =>*/this.form = this.props.form === undefined ? '' : this.props.form;
        this.url = this.props.url === undefined ? false : this.props.url;
        this.method = this.props.method === undefined ? false : this.props.method;
        this.data = this.props.data === undefined ? false : this.props.data;
        this.beforeFunction = this.props.before === undefined ? () => {alert('loading...')} : this.props.before;
        this.completeFunction = this.props.complete === undefined ? () => {alert('loaded')} : this.props.complete;
        this.successFunction = this.props.success === undefined ? () => {alert('success')} : this.props.success;
        this.errorFunction = this.props.error === undefined ? () => {alert('error')} : this.props.error;
    }

    send(e){
        if (this.type === "submit"){
            var beforeFunction   = this.beforeFunction,
                completeFunction = this.completeFunction,
                successFunction  = this.successFunction,
                errorFunction    = this.errorFunction;

            $.ajax({
                url: this.url,
                method: this.method,
                data: this.data,
                beforeSend: function () {
                    return beforeFunction();
                },
                complete: function () {
                    return completeFunction();
                },
                success: function (data) {
                    return successFunction(data);
                },
                error: function () {
                    return errorFunction();
                }
            });
        } else {
            //SCRIPT TO RESET THE FORM
        }
    }

    render(){
        return(
            <button type={this.type === "submit" ? 'button' : this.type}
                    id={this.id}
                    className={this.class}
                    style={this.style}
                    onClick={this.send.bind(this)}>
                {this.props.children}
            </button>
        );
    }
}

class Label extends React.Component{
    constructor(props){
        super(props);

        this.style = this.props.style === undefined ? {} : this.props.style;
        this.id = this.props.id === undefined ? '' : this.props.id;
        this.class = this.props.class === undefined ? '' : this.props.class;
    }

    render(){
        return <label id={this.id} className={this.class} style={this.style}>{this.props.children}</label>;
    }
}

class Input extends React.Component{
    constructor(props){
        super(props);

        this.type = this.props.type === undefined ? 'text' : this.props.type;
        this.placeholder = this.props.placeholder === undefined ? '' : this.props.placeholder;
        this.value = this.props.value === undefined ? '' : this.props.value;
        this.state = {
            value: this.value,
            length: this.value.length
        };
        this.handleChange = this.handleChange.bind(this);

        this.name = this.props.name === undefined ? false : this.props.name;
        this.id = this.props.id === undefined ? '' : this.props.id;
        this.class = this.props.class === undefined ? '' : this.props.class;

        this.style = this.props.style === undefined ? {} : this.props.style;

        this.required = this.props.required === undefined ? false : this.props.required;
        this.disabled = this.props.disabled === undefined ? false : this.props.disabled;
        this.checked = this.props.checked === undefined ? false : this.props.checked;
        this.maxlength = this.props.maxlength === undefined ? '' : this.props.maxlength;
        this.minlength = this.props.minlength === undefined ? '' : this.props.minlength;
        this.max = this.props.max === undefined ? '' : this.props.max;
        this.min = this.props.min === undefined ? '' : this.props.min;
        this.multiple = this.props.multiple === undefined ? false : this.props.multiple;
    }

    handleChange(e) {
        this.setState({value: e.target.value, length: e.target.value.length});
    }

    render(){
        var disable,
            multiple,
            checked,
            required;

        if (!this.name) return <p>Please enter the input name</p>;
        if (this.disabled) disable = 'disabled';
        if (this.multiple) multiple = 'multiple';
        if (this.checked) checked = 'checked';
        if (this.required) required = 'required';

        return <input type={this.type}
                      id={this.id}
                      className={this.class}
                      style={this.style}
                      name={this.name}
                      multiple={this.multiple}
                      maxLength={this.maxlength}
                      minLength={this.minlength}
                      max={this.max}
                      min={this.min}
                      disabled={disable}
                      required={required}
                      checked={checked}
                      value={this.state.value}
                      placeholder={this.placeholder}
                      onChange={this.handleChange}/>;
    }
}

class Form extends React.Component{
    constructor(props){
        super(props);

        this.style = this.props.style === undefined ? {} : this.props.style;
    }

    render(){
        return <form style={this.style}>{this.props.children}</form>;
    }
}