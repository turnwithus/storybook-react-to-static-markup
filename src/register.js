import React from 'react'
import addons from '@storybook/addons'
import { STORY_RENDERED } from '@storybook/core-events'

class StaticMarkupPanel extends React.Component {
  state = {
    markup: null
  }

  onReceivedMarkup = markup => {
    this.setState({
      markup: markup
    })
  };

  componentDidMount() {
    const { api } = this.props
    api.on('staticmarkup/markup', this.onReceivedMarkup)
  }

  componentWillUnmount() {
    const { api } = this.props
    api.off('staticmarkup/markup', this.onReceivedMarkup)
  }

  render() {
    const { active } = this.props
    const { markup } = this.state

    return active ? <div>
      <pre>
        <code>
          {markup}
        </code>
      </pre>
    </div> : null
  }
}

// Register the addon with a unique name.
addons.register('storybook/STATICMARKUP', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('storybook/STATICMARKUP/panel', {
    title: 'Static Markup',
    render: ({ active, key }) => <StaticMarkupPanel key={key} api={api} active={active} />,
  })
})
