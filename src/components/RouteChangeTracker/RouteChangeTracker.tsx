import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

/**
 * uri 변경 추적 컴포넌트
 * uri가 변경될 때마다 pageview 이벤트 전송
 */

const trackingId = process.env.REACT_APP_GA_TRACKING_ID;

export default function RouteChangeTracker() {
	const location = useLocation();

	useEffect(() => {
		if (trackingId) {
			ReactGA.initialize(trackingId);
			ReactGA.set({ page: location.pathname });
			ReactGA.send('pageview');
		}
	}, [location]);

	return null;
}
