import { Dashboard, Invoice, UserGuide, FileReturns } from '../../components/Icons/index';

// Added non individual navigation to side menu

const initialState = [
  {
    title: 'Applications',
    items: [

      {
        url: '/',
        icon: <FileReturns />,
        title: 'Manage Taxpayer',
        items: [
          {
            title: 'Dashboard',
            url: '/',
            items: [],
          },
          {
            title: 'Individual',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/view/individual',
                items: [],
              },
            ],
          },
          {
            title: 'Non-Individual',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/view/nonindividual',
                items: [],
              },
            ],
          },
        ],
      },
      
      {
        url: '/',
        icon: <FileReturns />,
        title: 'Manage User',
        items: [
          {
            title: 'Dashboard',
            url: '/',
            items: [],
          },
          {
            title: 'User',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <FileReturns />,
        title: 'Assessments',
        items: [
          {
            title: 'Create',
            url: '/',
            items: [],
          },
          {
            title: 'View',
            url: '/',
            items: [],
          },
          {
            title: 'Verify',
            url: '/',
            items: [],
          },
          {
            title: 'Approve',
            url: '/',
            items: [],
          },
          {
            title: 'Tax certificate',
            items: [
              { title: 'View', url: '/', items: [] },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/dashboard',
        icon: <Dashboard />,
        title: 'Dashboard',
        items: [],
      },
      {
        url: '/',
        icon: <Invoice />,
        title: 'PAYMENT',
        items: [
          {
            url: '/payment/new-payment',
            title: 'New Payment',
            items: [],
          },
          {
            url: '/payment/payment-history',
            title: 'Payment History',
            items: [],
          },
          {
            url: '/payment/pending-invoice',
            title: 'Pending Assessment',
            items: [],
          },
        ],
      },

      {
        url: '/',
        icon: <FileReturns />,
        title: 'FILE RETURNS',
        items: [
          {
            title: 'PAYE Monthly',
            items: [
              // { title: 'PAYE annual', url: '/uploads/annual', items: [] },
              { title: 'Upload', url: '/uploads/monthly', items: [] },
              {
                title: 'View',
                url: '/view/monthly',
                items: [],
              },
            ],
          },
          {
            title: 'PAYE Annual',
            items: [
              { title: 'Upload CSV', url: '/uploads/annual', items: [] },
              {
                title: 'View',
                url: '/view/annual',
                items: [],
              },
              { title: 'Upload Document', url: '/uploads/annualdocs', items: [] },
              { title: 'View document', url: '/view/viewdocuments', items: [] },

            ],
          },
          {
            title: 'Withholding',
            items: [
              // { title: 'PAYE annual', url: '/view/annual', items: [] },
              { title: 'Upload', url: '/uploads/withholding', items: [] },
              {
                title: 'View',
                url: '/view/withholding',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '#',
        icon: <UserGuide />,
        title: 'USER GUIDE',
        items: [],
      },


    ],
  },
];

export default function individualNavigation(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
