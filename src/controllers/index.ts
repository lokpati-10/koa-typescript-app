import { ParameterizedContext } from "koa"
import { format } from 'date-fns'
import Router, { RouterContext } from "koa-router"

type TodoItem = {
    name: string,
    createdOn: string,
    lastEditedOn: string,
    isCompleted: boolean
}

type RouteResponse<T> = T | Error

type RouteContext = ParameterizedContext & {
    params: {
        name: string
    }
}

interface ITodo {
    post: (ctx: RouteContext) => RouteResponse<Promise<TodoItem>>
    getTodoLists: () => RouteResponse<Promise<TodoItem[]>>
    getTodListByName: (ctx: RouteContext) => RouteResponse<Promise<TodoItem>>
    completeTodoTask: (ctx: RouteContext) => RouteResponse<Promise<TodoItem>>
    deleteTodo: (ctx: RouteContext) => RouteResponse<Promise<void>>
}


let todoItems: TodoItem[] = []

function getIndexOfTask(name: string) {
    for (let i = 0; i < todoItems.length; i++) {
        if (todoItems[i].name === name) return i
    }

    return undefined
}

function validateRequestAndReturnItemId(name: string, message: string, isPost: boolean = false) {
    if (name === undefined) throw new Error('Invalid todo Name')
    const id = getIndexOfTask(name)
    const isError = (id === undefined && !isPost) || (id !== undefined && isPost)
    if (isError) throw new Error(message)

    return id as number
}

export class Todo implements ITodo {
    public static instance: Todo | undefined = undefined

    public static getInstance(): Todo {
        if (this.instance !== undefined) return this.instance
        this.instance = new Todo()
        return this.instance
    }

    constructor() { }

    getTodoLists() {
        return Promise.resolve(todoItems)
    }

    getTodListByName(ctx: RouteContext) {
        const id = validateRequestAndReturnItemId(ctx.params.name, 'todoItem does not exist')
        return Promise.resolve(todoItems[id])

    }

    completeTodoTask(ctx: RouteContext) {
        const id = validateRequestAndReturnItemId(ctx.params.name, 'todoItem does not exist')
        const updatedToDoItem = {
            ...todoItems[id],
            isCompleted: true,
            lastEditedOn: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        }

        todoItems[id] = updatedToDoItem

        return Promise.resolve(todoItems[id])
    }

    deleteTodo(ctx: RouteContext) {
        validateRequestAndReturnItemId(ctx.params.name, 'todoItem does not exist')
        todoItems = todoItems.filter(item => item.name !== ctx.params.name)
        return Promise.resolve(undefined)
    }

    post(ctx: RouteContext) {
        validateRequestAndReturnItemId(ctx.params.name, 'todoItem already exist', true)
        const newTodoItem: TodoItem = {
            name: ctx.params.name,
            createdOn: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            lastEditedOn: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
            isCompleted: false
        }
        todoItems.push(newTodoItem)

        return Promise.resolve(newTodoItem)

    }
}

const router = new Router()
const todoInstance = Todo.getInstance()

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE'

const routes: { url: string, methods: methods[], route: Function }[] = [
    {
        url: '/api/v1/todo',
        methods: ['GET'],
        route: todoInstance.getTodoLists
    },
    {
        url: '/api/v1/todo/:name',
        methods: ['GET'],
        route: todoInstance.getTodListByName
    },
    {
        url: '/api/v1/todo/:name',
        methods: ['POST'],
        route: todoInstance.post
    },
    {
        url: '/api/v1/todo/:name',
        methods: ['PUT'],
        route: todoInstance.completeTodoTask
    },
    {
        url: '/api/v1/todo/:name',
        methods: ['DELETE'],
        route: todoInstance.deleteTodo
    }
]

function routeHandler(route: Function) {
    return async (ctx: RouterContext, next: any) => {
        try {
            const res = await route(ctx)
            ctx.response.status = 200
            ctx.response.body = {
                data: res
            }
        } catch (error) {
            ctx.response.status = 400
            ctx.response.body = {
                reason: error.message,
                dateTime: new Date()
            }
        }

        return next()
    }
}

for (let item of routes) {
    const { url, methods, route } = item
    router.register(url, methods, routeHandler(route))
}


export const getAllRoutes = (): Router => router