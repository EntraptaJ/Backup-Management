// Web/UI/Components/Router/AppRoutes.tsx
import { AppRoute } from './AppRoute';

export const AppRoutes: AppRoute[] = [
  {
    path: 'Setup',
    label: 'Setup',
    exact: true,
    imported: {
      imported: import('UI/Routes/Configuration/InitialConfiguration'),
      path: 'Routes/Configuration/InitialConfiguration',
    },
  },
  {
    path: '',
    label: 'Home',
    exact: true,
    imported: {
      imported: import('UI/Routes/Home'),
      path: 'Routes/Home/index.tsx',
    },
  },
  {
    path: 'Services',
    label: 'Services',
    imported: {
      imported: import('UI/Routes/Services/Services'),
      path: 'Routes/Services/Services.tsx',
    },
    children: [
      {
        path: ':serviceId',
        label: 'Service',
        imported: {
          imported: import('UI/Routes/Services/Service'),
          path: 'Routes/Services/Service.tsx',
        },
        children: [
          {
            path: ':clientId',
            label: 'Client',
            imported: {
              imported: import('UI/Routes/Services/Client'),
              path: 'Routes/Services/Client.tsx',
            },
          },
        ],
      },
    ],
  },
  {
    path: 'Login',
    label: 'Login',
    imported: {
      imported: import('UI/Routes/Authentication/Login'),
      path: 'Routes/Authentication/Login.tsx',
    },
  },
  {
    path: 'Register',
    label: 'Register',
    imported: {
      imported: import('UI/Routes/Authentication/Register'),
      path: 'Routes/Authentication/Register.tsx',
    },
  },
  {
    path: 'Admin',
    label: 'Admin',
    exact: true,
    imported: {
      imported: import('UI/Routes/Admin/Home'),
      path: 'Routes/Admin/Home.tsx',
    },
    children: [
      {
        path: 'Test',
        label: 'Test',
        imported: {
          imported: import('UI/Routes/Admin/Test'),
          path: 'Routes/Admin/Test.tsx',
        },
      },
    ],
  },
];
