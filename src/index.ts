import { Elysia, t } from "elysia";
import { plugin } from "./plugin";
import { ProductDTO, SignInDTO } from "./module";

const app = new Elysia().get("/", () => "First Bun RESTFULL APIs").listen(3000)
  .use(plugin)
  .state({
    id: 1,
    email: 'jane@doe.com'
  })
  .decorate('getDate', () => Date.now())
  .get('/post/:id', ({ params: { id } }) => { return { id: id, title: 'Learn Bun' } })
  .post('/post', ({ body, set, store }) => {
    console.log(store)
    set.status = 201
    return body
  })
  .get('/track/*', () => { return 'Track Route' })
  .get('/tracks', ({ store, getDate }) => {
    return {
      "tracks": [
        'Dancing feat',
        'Sam I',
        'Animals',
        'New'
      ]
    }
  });

app.group('/user', app => app
  .post('/sign-in', ({ body }) => body, {
    body: SignInDTO,
    response: SignInDTO
  })
  .post('sign-up', () => 'Signup Route')
  .post('/profile', () => 'Profile Route')
  .get('/:id', () => 'User by id')
);

app.group('/v1', app => app
  .get('/', () => 'Version 1')
  .group('/products', app => app
    .post('/', () => 'Create Product')
    .get('/:id', ({ params: { id } }) => {
      return id
    },
      {
        params: ProductDTO
      }
    )
    .put('/:id', () => 'Update product')
    .delete('/delete/:id', () => 'Delete by id')
  )
)

app.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
