import React from 'react';
import styled from 'styled-components';

const Box = styled.div<{ isEditing?: boolean }>`
  dispaly: felx;
  align-items: center;
  padding: ${props => (props.isEditing ? '5px 0px' : '15px 25px')};
  width: 100%;
  font-size: 1.1em;
  border-bottom: 1px solid #eee;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: 0;
`;

export default function TodoInput({
  setTodoList,
  isEditing,
  editContent,
  editModeTodo,
  editTodo,
}: {
  setTodoList?: (todo: ITodoItem) => void;
  isEditing?: boolean;
  editContent?: string;
  editModeTodo?: () => void;
  editTodo?: (content: string) => void;
}) {
  const [content, setContent] = React.useState<string>('');
  return (
    <Box isEditing={isEditing}>
      <Input
        placeholder="할일을 입력해 주세요"
        value={content}
        onBlur={e => {
          if (e.currentTarget === e.target) {
            editTodo && editTodo(content);
          }
        }}
        onChange={e => setContent(e.target.value)}
        onKeyPress={e => {
          if (content === '') return;
          if (e.key !== 'Enter' && e.key !== 'NumpadEnter') return;
          if (isEditing) {
            editTodo && editTodo(content);
          } else {
            setTodoList &&
              setTodoList({
                id: '0',
                content: content,
                completed: false,
                editing: false,
              });
            setContent('');
          }
        }}
      />
    </Box>
  );
}
