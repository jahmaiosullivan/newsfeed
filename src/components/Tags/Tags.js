import React, {Component, PropTypes} from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

export default class PostForm extends Component {
  static propTypes = {
    suggestions: PropTypes.array,
    tags: PropTypes.array,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this._handleAddition = (tag) => { this.handleAddition(tag);};
    this._handleDelete = (index) => { this.handleDelete(index);};
    this._handleDrag = (tag, currPos, newPos) => { this.handleDrag(tag, currPos, newPos); };
    this.state = { tags: props.tags ? props.tags : [], suggestions: props.suggestions ? props.suggestions : [] };
  }

  handleDelete(index) {
    const {tags} = this.state;
    const {onChange} = this.props;

    tags.splice(index, 1);
    this.setState({tags: tags});
    onChange(tags);
  }

  handleAddition(tag) {
    const {tags} = this.state;
    const {onChange} = this.props;

    tags.push({
      id: tags.length + 1,
      text: tag
    });
    this.setState({tags: tags});
    onChange(tags);
  }

  handleDrag(tag, currPos, newPos) {
    const {tags} = this.state;
    const {onChange} = this.props;

    // mutate array
    tags.splice(currPos, 1);
    tags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: tags });
    onChange(tags);
  }

  render() {
    const { tags, suggestions } = this.state;
    const tagStyles = require('./Tags.scss');

    return (
      <ReactTags tags={tags}
                 classNames={{
                   tags: tagStyles.tags,
                   tagInput: tagStyles.tagInput,
                   selected: tagStyles.selected,
                   tag: tagStyles.tag,
                   remove: tagStyles.remove,
                   suggestions: tagStyles.suggestions
                 }}
                 suggestions={suggestions}
                 handleDelete={this._handleDelete}
                 handleAddition={this._handleAddition}
                 handleDrag={this._handleDrag} />
    );
  }
}
