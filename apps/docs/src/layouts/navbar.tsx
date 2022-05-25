import React, { useState, useEffect } from 'react';
import {
  Logo,
  MenuToggle,
  Badge,
  Twitter,
  Discord,
  Github,
  ThemeToggle,
  Heart
} from '@components';
import { Box } from '@primitives';
import cn from 'classnames';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import {
  Row,
  Col,
  Spacer,
  Link,
  Button,
  useBodyScroll
} from '@nextui-org/react';
import { Route } from '@lib/docs/page';
import { Container } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@hooks/use-media-query';
import { isActive } from '@utils/links';
import { includes } from 'lodash';
import { StyledNavMainContainer } from './styles';
import { darkTheme } from '@theme/shared';
import { pulse } from '@utils/animations';

export interface Props {
  routes?: Route[];
  hasNotify?: boolean;
  isHome?: boolean;
}

const MobileNavigation = dynamic(
  () => import('../components/mobile-navigation'),
  {
    ssr: false
  }
);

const SearchInput = dynamic(
  () => import('../components/search/instant-search'),
  {
    ssr: true
  }
);

const StyledNavContainer = dynamic(() => import('./styles'), {
  ssr: false
});

const Navbar: React.FC<Props> = ({ isHome, hasNotify, routes }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const isMobile = useMediaQuery(960);
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });
  const [scrollPosition, setScrollPosition] = useState(
    (typeof window !== 'undefined' && window.pageYOffset) || 0
  );

  const detached = hasNotify ? scrollPosition > 30 : scrollPosition > 0;

  useEffect(() => {
    window.addEventListener('scroll', onScroll.bind(this));
    return () => {
      window.removeEventListener('scroll', onScroll.bind(this));
    };
  }, []);

  const onScroll = () => {
    requestAnimationFrame(() => {
      setScrollPosition(window.pageYOffset);
    });
  };

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
      setBodyHidden(false);
    }
  }, [isMobile]);

  const onToggleNavigation = () => {
    setExpanded(!expanded);
    isMobile && setBodyHidden(!expanded);
  };

  const showBlur = !!expanded || !!detached || isHome;

  return (
    <StyledNavMainContainer id="navbar-container">
      <StyledNavContainer detached={detached} showBlur={showBlur}>
        <Container
          lg={true}
          as="nav"
          display="flex"
          wrap="nowrap"
          alignItems="center"
        >
          <Col
            className="navbar__logo-container"
            css={{
              '@mdMax': {
                width: '100%'
              }
            }}
          >
            <Row justify="flex-start" align="center">
              <NextLink href="/">
                <Link href="/">
                  <Logo
                    auto
                    className="navbar__logo"
                    css={{
                      cursor: 'pointer',
                      transition: '$default'
                    }}
                  />
                </Link>
              </NextLink>
              <Spacer x={0.4} />
              <Badge
                solid
                css={{
                  px: '$4',
                  '@mdMax': {
                    display: 'none'
                  }
                }}
                type="secondary"
              >
                Beta
              </Badge>
            </Row>
          </Col>
          <Col
            className="navbar__resources-container"
            css={{ '@mdMax': { d: 'none' } }}
          >
            <Row justify="center" align="center">
              <Spacer x={1} y={0} />
              <NextLink href="/docs/guide/getting-started">
                <Link
                  className={cn('navbar__link', {
                    active:
                      isActive(router.pathname, '/docs/[[...slug]]') &&
                      !includes(router.asPath, 'components')
                  })}
                  href="#"
                  css={{
                    color: '$text',
                    '&.active': {
                      fontWeight: '600',
                      color: '$primary'
                    }
                  }}
                >
                  Docs
                </Link>
              </NextLink>
              <Spacer x={1} y={0} />
              <NextLink href="/docs/components/avatar">
                <Link
                  aria-disabled
                  className={cn('navbar__link', {
                    active: includes(router.asPath, 'components')
                  })}
                  title="Components"
                  css={{
                    color: '$text',
                    '&.active': {
                      fontWeight: '600',
                      color: '$primary'
                    }
                  }}
                >
                  Components
                </Link>
              </NextLink>
              <Spacer x={1} y={0} />
              <Link
                className="navbar__link"
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/nextui-org/nextui/discussions/new?category=feedback"
                title="Leave your feedback"
                css={{
                  color: '$text'
                }}
              >
                Feedback
              </Link>
            </Row>
          </Col>
          <Col className="navbar__search-container">
            <Row
              className="navbar__search-row"
              justify="flex-end"
              align="center"
              css={{
                position: 'initial',
                '@mdMax': {
                  jc: 'center'
                }
              }}
            >
              <Row
                className="navbar__social-icons-container"
                justify="flex-end"
                align="center"
                gap={1}
                css={{
                  width: 'initial',
                  '@mdMax': {
                    d: 'none'
                  }
                }}
              >
                <Link
                  className="navbar__social-icon"
                  href="https://twitter.com/getnextui"
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    m: '0 6px',
                    '& svg': {
                      transition: '$default'
                    },
                    '&:hover': {
                      '& svg': {
                        opacity: 0.7
                      }
                    }
                  }}
                >
                  <Twitter size={24} />
                </Link>
                <Link
                  className="navbar__social-icon"
                  href="https://discord.gg/9b6yyZKmH4"
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    m: '0 6px',
                    '& svg': {
                      transition: '$default'
                    },
                    '&:hover': {
                      '& svg': {
                        opacity: 0.7
                      }
                    }
                  }}
                >
                  <Discord size={24} />
                </Link>
                <Link
                  className="navbar__social-icon"
                  href="https://github.com/nextui-org/nextui"
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    m: '0 6px',
                    '& svg': {
                      transition: '$default'
                    },
                    '&:hover': {
                      '& svg': {
                        opacity: 0.7
                      }
                    }
                  }}
                >
                  <Github size={24} />
                </Link>
                <ThemeToggle
                  className="navbar__social-icon"
                  css={{
                    m: '0 6px',
                    '& svg': {
                      transition: '$default'
                    },
                    '&:hover': {
                      '& svg': {
                        opacity: 0.7
                      }
                    }
                  }}
                />
              </Row>
              <SearchInput offsetTop={detached ? 0 : 30} />
              <Spacer x={0.5} />
              <Button
                auto
                as="a"
                href="https://patreon.com/jrgarciadev"
                target="_blank"
                rel="noreferrer"
                icon={
                  <Heart filled size={20} fill="var(--nextui-colors-red600)" />
                }
                css={{
                  bg: '$gray50',
                  color: '$text',
                  maxH: '38px',
                  px: '$8',
                  '@mdMax': {
                    d: 'none'
                  },
                  '& .nextui-button-icon': {
                    mr: '$2'
                  },
                  '& .nextui-button-icon svg': {
                    transition: '$default'
                  },
                  '&:hover': {
                    '& .nextui-button-icon svg': {
                      animation: `${pulse} 1s infinite`
                    }
                  },
                  [`.${darkTheme} &`]: {
                    bg: 'rgba(51, 51,51,0.7)',
                    '@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))':
                      {
                        bf: 'saturate(180%) blur(14px)'
                      }
                  }
                }}
              >
                Sponsor
              </Button>
            </Row>
          </Col>
          <Col
            className="navbar__menu-container"
            css={{
              size: '100%',
              display: 'none',
              '@mdMax': {
                display: 'flex',
                justifyContent: 'flex-end'
              }
            }}
          >
            <ThemeToggle
              className="navbar__social-icon-mobile"
              css={{ m: '0' }}
            />
            <Box
              className="navbar__menu-arrow noselect"
              onClick={onToggleNavigation}
              css={{
                height: '100%',
                minHeight: '40px',
                minWidth: '30px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <MenuToggle expanded={expanded} />
            </Box>
          </Col>
          <MobileNavigation
            hasNotify={hasNotify}
            routes={routes}
            opened={expanded}
            detached={detached}
            onClose={() => {
              setExpanded(false);
              setBodyHidden(false);
            }}
          />
        </Container>
      </StyledNavContainer>
    </StyledNavMainContainer>
  );
};

export default Navbar;
