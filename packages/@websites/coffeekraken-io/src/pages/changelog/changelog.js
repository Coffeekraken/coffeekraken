import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
export default {
  slugs: ['/changelog/:version?'],
  params: {},
  views: [
    {
      data({ req }) {
        const versions = __readJsonSync(
          `${__dirname()}/../../../versions.json`
        );
        const lastVersion = Object.keys(versions)[0];
        let requestedVersion = versions[lastVersion];
        requestedVersion.version = lastVersion;
        if (versions[req.params.version]) {
          requestedVersion = versions[req.params.version];
          requestedVersion.version = req.params.version;
        }
        return {
          requestedVersion,
        };
      },
      path: 'pages.changelog.changelog',
    },
  ],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFbkUsZUFBZTtJQUNYLEtBQUssRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQy9CLE1BQU0sRUFBRSxFQUFFO0lBQ1YsS0FBSyxFQUFFO1FBQ0g7WUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQ1IsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUMzQixHQUFHLFNBQVMsRUFBRSx5QkFBeUIsQ0FDMUMsQ0FBQztnQkFDRixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDN0MsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztnQkFDdkMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUIsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2hELGdCQUFnQixDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztpQkFDakQ7Z0JBQ0QsT0FBTztvQkFDSCxnQkFBZ0I7aUJBQ25CLENBQUM7WUFDTixDQUFDO1lBQ0QsSUFBSSxFQUFFLDJCQUEyQjtTQUNwQztLQUNKO0NBQ0osQ0FBQyJ9
