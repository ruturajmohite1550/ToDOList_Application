package com.example.Todo.service;

import com.example.Todo.entity.Todo;
import com.example.Todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Override
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id).orElse(null);
    }

    @Override
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo updateTodo(Long id, Todo updatedTodo) {
        Optional<Todo> optionalTodo = todoRepository.findById(id);
        if (optionalTodo.isPresent()) {
            Todo todo = optionalTodo.get();
            todo.setTitle(updatedTodo.getTitle());
            todo.setDescription(updatedTodo.getDescription());
            todo.setCompleted(updatedTodo.isCompleted());
            return todoRepository.save(todo);
        } else {
            return null;
        }
    }

    @Override
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
