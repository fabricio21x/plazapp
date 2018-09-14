import { NavigationActions } from 'react-navigation';

export function resetAction(myScreenInitial) { 		// myScreenInitial = 'Home'
	return (
		NavigationActions.reset({
    	index: 0,
    	actions: [
      				NavigationActions.navigate({ routeName: myScreenInitial })
    			 ],
    	key: null
		})
	);
}

