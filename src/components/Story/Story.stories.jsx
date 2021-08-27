import React from 'react';

import Story from './Story';

export default {
  title: 'Story',
  component: Story
};

const Template = (args) => <Story {...args} />;

export const Justin = Template.bind({});
Justin.args = {
    id: 192327,
    by: "justin",
    time: 1210981217,
    title: "Justin.tv is looking for a Lead Flash Engineer!",
    url: "",
    score: 6,
    descendants: [123, 234, 345, 456]
};