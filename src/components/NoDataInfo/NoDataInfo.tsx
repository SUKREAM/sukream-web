import React from 'react';

import { SmileOutlined } from '@ant-design/icons';
import * as S from './NoDataInfo.styles';

interface IProps {
	text?: string;
	height?: string;
}

export default function NoDataInfo({ text, height }: IProps) {
	return (
		<S.NoData height={height}>
			<SmileOutlined />
			{text ? 
			(<p>{`등록된 ${text} 없습니다.`}</p>) :
			<p>{`필요한 상품을 검색하세요.`}</p>
		}
		</S.NoData>
	);
}
