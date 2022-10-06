import { RhmDashboard, ManageTaxpayer, DirectAssessment, Paye, Collections, Settings } from '../../components/Icons/index';

// Added non individual navigation to side menu

const initialState = [
  {
    title: 'Applications',
    items: [
      {
        url: '/dashboard',
        icon: <RhmDashboard />,
        title: 'Dashboard',
        items: [],
      },

      {
        url: '/',
        icon: <ManageTaxpayer />,
        title: 'Manage Taxpayer',
        items: [
          // {
          //   title: 'Dashboard',
          //   url: '/',
          //   items: [],
          // },
          {
            title: 'Individual',
            items: [
              { title: 'Create', url: '/taxpayer', items: [] },
              {
                title: 'View',
                url: '/reports-individual',
                items: [],
              },
            ],
          },
          {
            title: 'Non-Individual',
            items: [
              { title: 'Create', url: '/taxpayer/non-individual', items: [] },
              {
                title: 'View',
                url: '/reports-non-individual',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <DirectAssessment />,
        title: 'Direct Assessment',
        items: [
          {
            title: 'Create',
            url: '/direct-asses',
            items: [],
          },
          {
            title: 'Draft Assessments',
            url: '/view/pendingdirect',
            items: [],
          },
          {
            title: 'Submitted Assessments',
            url: '/view/completeddirect',
            items: [],
          },
          {
            title: 'Verified BOJ',
            url: '/view/listverifiedboj',
            items: [],
          },
          // {
          //   title: 'Approved Assessments',
          //   url: '/approved-assement-report',
          //   items: [],
          // },
          {
            title: 'Approved Assessments',
            url: '/view/approvedasses',
            items: [],
          },
          {
            url: '/',
            title: 'Tax Clearance (TCC)',
            items: [
              {
                url: '/',
                title: 'Tax Clearance (TCC)',
                items: [
                  {
                    url: '/view/listapprovedtcc',
                    title: 'View Approved',
                    items: [],
                  },
                  {
                    url: '/view/listtcc',
                    title: 'View All',
                    items: [],
                  },
                  {
                    url: '/view/listprinttcc',
                    title: 'View Print',
                    items: [],
                  },
                ],
              },
            ],
          },
          {
            url: '/',
            title: 'Report',
            items: [
              {
                title: 'Assessment',
                url: '/assessment-report',
                items: [],
              },
              {
                title: 'Unassessed Collections',
                url: '/unassessed-report',
                items: [],
              },
            ],
          },
          {
            url: '/',
            title: 'Objection',
            items: [
              {
                title: 'Submitted',
                url: '/view/objection/submitted',
                items: [],
              },
              {
                title: 'Verified',
                url: '/view/objection/verified',
                items: [],
              },
              {
                title: 'Approved',
                url: '/view/objection/approved',
                items: [],
              },
            ],
          },
        ],
      },

      {
        url: '/',
        icon: <Paye />,
        title: 'PAYE',
        items: [
          {
            url: '/',
            title: 'TCC',
            items: [
              {
                title: 'View',
                url: '/view/listpayetcc',
                items: [],
              },
              // {
              //   title: 'Unassessed Collections',
              //   url: '/unassessed-report',
              //   items: [],
              // },
            ],
          },
          // {
          //   url: '/',
          //   title: 'PAYSLIP',
          //   items: [
          //     {
          //       title: 'Create',
          //       url: '/',
          //       items: [],
          //     },
          //     {
          //       title: 'View',
          //       url: '/',
          //       items: [],
          //     },

          //   ],
          // },
          // {
          //   url: '/',
          //   title: 'Dashboard',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Annual Returns',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Remittance Schedules',
          //   items: [],
          // },
          // {
          //   url: '/reports',
          //   title: 'Reports',
          //   items: [],
          // },
        ],
      },

      // {
      //   url: '/',
      //   icon: <Paye />,
      //   title: 'MARKET',
      //   items: [
      //     {
      //       url: '/',
      //       title: 'Agent',
      //       items: [
      //         {
      //           title: 'Register',
      //           url: '/markets/agents/register/registeragent',
      //           items: [],
      //         },
      //         {
      //           title: 'List',
      //           url: '/view/agents/list-agents',
      //           items: [],
      //         },
      //       ],
      //     },

      //   ],
      // },

      {
        url: '/',
        icon: <Collections />,
        title: 'Collections',
        items: [
          // {
          //   url: '/',
          //   title: 'Dashboard',
          //   items: [],
          // },
          {
            title: 'View',
            url: '/reports',
            items: [],
          },
          // {
          //   title: 'DA Receipt',
          //   url: '/da-receipt',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Reconcilliations',
          //   items: [],
          // },
          // {
          //   url: '/',
          //   title: 'Generate Receipt',
          //   items: [
          //     {
          //       url: '/',
          //       title: 'Create',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'View',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'Verify',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'Approve',
          //       items: [],
          //     },
          //     {
          //       url: '/',
          //       title: 'Recon Report',
          //       items: [],
          //     },
          //   ],
          // },
        ],
      },

      {
        url: '/',
        icon: <Settings />,
        title: 'Settings',
        items: [
          {
            title: 'Manage User',
            items: [
              { title: 'Create', url: '/register', items: [] },
              {
                title: 'View',
                url: '/view/users',
                items: [],
              },
            ],
          },
          {
            title: 'Revenue Items',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/',
                items: [],
              },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
              {
                title: 'Delete',
                url: '/',
                items: [],
              },
            ],
          },

          {
            title: 'Tax Office',
            items: [
              { title: 'Create', url: '/', items: [] },
              {
                title: 'View',
                url: '/',
                items: [],
              },
              { title: 'Edit', url: '/', items: [] },
              { title: 'Delete', url: '/', items: [] },

            ],
          },
          {
            title: 'Sectors',
            items: [
              { title: 'Create', url: '/', items: [] },
              { title: 'View', url: '/', items: [] },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
              {
                title: 'Delete',
                url: '/',
                items: [],
              },
            ],
          },
          {
            title: 'Budget Estimate',
            items: [
              { title: 'Create', url: '/', items: [] },
              { title: 'View', url: '/', items: [] },
              {
                title: 'Edit',
                url: '/',
                items: [],
              },
              {
                title: 'Delete',
                url: '/',
                items: [],
              },
            ],
          },
          {
            title: 'Business Type',
            items: [
              { title: 'Create', url: '/settings/business-type/create', items: [] },
              { title: 'View', url: '/settings/view-business-type', items: [] },
              // {
              //   title: 'Edit',
              //   url: '/',
              //   items: [],
              // },
            ],
          },
        ],
      },
    ],
  },
];

export default function navigationAdmin(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
