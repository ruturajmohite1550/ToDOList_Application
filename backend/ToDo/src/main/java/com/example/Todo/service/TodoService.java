package com.example.Todo.service;

import com.example.Todo.entity.Todo;
import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos();
    Todo getTodoById(Long id);
    Todo createTodo(Todo todo);
    Todo updateTodo(Long id, Todo todo);
    void deleteTodo(Long id);
}
